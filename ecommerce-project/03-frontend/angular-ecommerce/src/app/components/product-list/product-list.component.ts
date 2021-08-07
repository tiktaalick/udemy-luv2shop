import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { GetResponseProducts, ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.listProducts();
  }

  listProducts() {
    if (this.route.snapshot.paramMap.has('keyword')) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword)
      .subscribe((data: GetResponseProducts) => this.processPageResult(data));
  }

  handleListProducts() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(
      // Pagination component in Angular is 1-based and Spring Data REST is 0-based.
      this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId).subscribe((data: GetResponseProducts) => this.processPageResult(data));
  }

  processPageResult(data: GetResponseProducts) {
    this.products = data._embedded.products;
    // Pagination component in Angular is 1-based and Spring Data REST is 0-based.
    this.pageNumber = data.page.number + 1;
    this.pageSize = data.page.size;
    this.totalElements = data.page.totalElements;
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
