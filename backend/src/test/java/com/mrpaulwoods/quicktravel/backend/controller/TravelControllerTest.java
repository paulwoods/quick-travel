package com.mrpaulwoods.quicktravel.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mrpaulwoods.quicktravel.backend.dto.AddressDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TravelController.class)
public class TravelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testSubmitAddresses() throws Exception {
        // Create test addresses
        AddressDto address1 = new AddressDto(1L, "123 Main St", "Anytown", "CA", "12345", "USA");
        AddressDto address2 = new AddressDto(2L, "456 Oak Ave", "Somewhere", "NY", "67890", "USA");
        List<AddressDto> addresses = Arrays.asList(address1, address2);

        // Convert addresses to JSON
        String addressesJson = objectMapper.writeValueAsString(addresses);

        // Perform POST request and verify response
        mockMvc.perform(post("/api/travel/addresses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(addressesJson))
                .andExpect(status().isCreated())
                .andExpect(content().string("Successfully received 2 addresses for travel planning"));
    }
}