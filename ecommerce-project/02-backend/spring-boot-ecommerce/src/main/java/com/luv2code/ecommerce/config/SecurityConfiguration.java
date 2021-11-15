package com.luv2code.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Protects endpoint /api/orders
        http.authorizeRequests()
                .antMatchers("/api/orders/**")
                .authenticated() // only for authenticated users
                .and()
                .oauth2ResourceServer() // configures OAuth2 resource server support
                .jwt(); // enables JWT-encoded bearer token support

        // Adds CORS filters
        http.cors();

        // Forces a non-empty response body for 401's to make the response more friendly
        Okta.configureResourceServer401ResponseBody(http);

        // Disables Cross Site Request Forgery since we are not using cookies for session trakcing
        http.csrf().disable();
    }
}
