package com.mrpaulwoods.quicktravel.backend.repository;

import com.mrpaulwoods.quicktravel.backend.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AddressRepository extends CrudRepository<Address, UUID> {
}
