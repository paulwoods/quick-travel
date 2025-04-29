package com.mrpaulwoods.quicktravel.backend.controller;

import com.mrpaulwoods.quicktravel.backend.dto.AddressDto;
import com.mrpaulwoods.quicktravel.backend.entity.Address;
import com.mrpaulwoods.quicktravel.backend.repository.AddressRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressRepository addressRepository;

    AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @GetMapping
    ResponseEntity<List<AddressDto>> list() {
        List<AddressDto> addressDtos = new ArrayList<>();
        addressRepository.findAll().forEach(address ->
                addressDtos.add(convertToDto(address))
        );
        return ResponseEntity.ok(addressDtos);
    }

    @GetMapping("/{id}")
    ResponseEntity<AddressDto> read(@PathVariable Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
        return ResponseEntity.ok(convertToDto(address));
    }

    @PostMapping
    ResponseEntity<AddressDto> create(@RequestBody @Valid AddressDto addressDto) {
        Address address = convertToEntity(addressDto);
        Address savedAddress = addressRepository.save(address);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(savedAddress));
    }

    @PutMapping("/{id}")
    ResponseEntity<AddressDto> update(@PathVariable Long id, @RequestBody @Valid AddressDto addressDto) {
        if (!addressRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found");
        }

        Address address = convertToEntity(addressDto);
        address.setId(id);
        Address updatedAddress = addressRepository.save(address);
        return ResponseEntity.ok(convertToDto(updatedAddress));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!addressRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found");
        }
        addressRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private AddressDto convertToDto(Address address) {
        return new AddressDto(
                address.getId(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry()
        );
    }

    private Address convertToEntity(AddressDto addressDto) {
        Address address = new Address();
        if (addressDto.getId() != null) {
            try {
                address.setId(addressDto.getId());
            } catch (IllegalArgumentException ignored) {
                // Use default generated Long if provided ID is invalid
            }
        }
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        address.setCountry(addressDto.getCountry());
        return address;
    }
}
