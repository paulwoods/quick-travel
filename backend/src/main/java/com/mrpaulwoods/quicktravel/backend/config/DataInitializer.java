package com.mrpaulwoods.quicktravel.backend.config;

import com.mrpaulwoods.quicktravel.backend.entity.Address;
import com.mrpaulwoods.quicktravel.backend.repository.AddressRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(AddressRepository addressRepository) {
        return args -> {
            // Real Plano, TX addresses
            List<Address> planoAddresses = Arrays.asList(
                    new Address("1000 Coit Road", "Plano", "TX", "75075", "USA"),
                    new Address("7224 Independence Pkwy", "Plano", "TX", "75025", "USA"),
                    new Address("6505 W Park Blvd", "Plano", "TX", "75093", "USA"),
                    new Address("8000 Coit Road", "Plano", "TX", "75025", "USA"),
                    new Address("1901 Preston Rd", "Plano", "TX", "75093", "USA"),
                    new Address("2801 E Spring Creek Pkwy", "Plano", "TX", "75074", "USA"),
                    new Address("5500 Preston Rd", "Plano", "TX", "75093", "USA"),
                    new Address("1717 E Spring Creek Pkwy", "Plano", "TX", "75074", "USA"),
                    new Address("3801 Dallas Pkwy", "Plano", "TX", "75093", "USA"),
                    new Address("2000 Legacy Dr", "Plano", "TX", "75024", "USA")
            );

            // Save all addresses to the database

            addressRepository.saveAll(planoAddresses);

            System.out.println("Database initialized with " + planoAddresses.size() + " Plano, TX addresses");
        };
    }
}
