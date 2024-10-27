package com.example.CommuneKitBackendTest.service;

public interface GeocodingService {
    double [] getCoordinates(String address) throws Exception;
}
