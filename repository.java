package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Pay;

@Repository
public interface repository extends JpaRepository<Pay,String> {

}