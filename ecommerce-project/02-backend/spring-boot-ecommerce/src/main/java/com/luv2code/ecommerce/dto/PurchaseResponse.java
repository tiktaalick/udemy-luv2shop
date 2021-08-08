package com.luv2code.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {

    // Lombok @Data will generate constructor only for final or @NonNull fields
    private final String orderTrackingNumber;
}
