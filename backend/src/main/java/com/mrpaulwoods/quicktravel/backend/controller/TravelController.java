package com.mrpaulwoods.quicktravel.backend.controller;

import com.mrpaulwoods.quicktravel.backend.dto.AddressDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for handling travel-related operations.
 */
@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "*")
public class TravelController {

    /**
     * Endpoint to receive a list of addresses for travel planning.
     *
     * @param addresses List of addresses to process
     * @return Response with status and message
     */
    @PostMapping("/addresses")
    public ResponseEntity<String> submitAddresses(@RequestBody List<AddressDto> addresses) {
        // Log the received addresses (for demonstration purposes)
        System.out.println("Received " + addresses.size() + " addresses for travel planning");

        // Here you would typically process the addresses, perhaps calculating routes,
        // saving to a database, or integrating with a mapping service

        // For now, just return a success response
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Successfully received " + addresses.size() + " addresses for travel planning");
    }
}