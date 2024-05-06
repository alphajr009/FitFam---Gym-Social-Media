package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/media/**")
                .addResourceLocations("file:./media/");

        registry.addResourceHandler("/status/**")
                .addResourceLocations("file:./status/");

        registry.addResourceHandler("/meal/**")
                .addResourceLocations("file:./meal/");
    }


}
