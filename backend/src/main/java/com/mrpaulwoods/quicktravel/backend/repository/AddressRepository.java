package com.mrpaulwoods.quicktravel.backend.repository;

import com.mrpaulwoods.quicktravel.backend.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
}
