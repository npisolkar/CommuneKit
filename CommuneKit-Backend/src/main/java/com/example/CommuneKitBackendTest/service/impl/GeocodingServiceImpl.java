package com.example.CommuneKitBackendTest.service.impl;

import com.example.CommuneKitBackendTest.service.GeocodingService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;

@Service
public class GeocodingServiceImpl implements GeocodingService {

    private String apiKey = "aISAcfQr0eiZOBRdXBLtv2rrjIkYRFu3";
    private String baseUrl = "http://www.mapquestapi.com/geocoding/v1/address?key=";

    @Override
    public double[] getCoordinates(String address) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = baseUrl + apiKey + "&location=" + URLEncoder.encode(address, "UTF-8");

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());

                JsonNode location = root.path("results").get(0).path("locations").get(0).path("latLng");
                double lat = location.get("lat").asDouble();
                double lng = location.get("lng").asDouble();

                return new double[]{lat, lng};
            } else {
                System.err.println("Error: Failed to get coordinates from MapQuest. Status: " + response.getStatusCode());
                return new double[]{0, 0};
            }
        } catch (Exception e) {
            System.err.println("Exception occurred while fetching coordinates: " + e.getMessage());
            return new double[]{0, 0};
        }
    }
}
