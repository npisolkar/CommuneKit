/* FetchPage: contains a basic framework for loading pages with
*  information from the database. Should be reusable. */

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/reports"


export function getReports() {
    return axios.get(API_BASE_URL);
}

export function updateReports(reportId, reportDto) {
    try {
        console.log("in updateReports:" + reportDto)
        return axios.put(API_BASE_URL + "/" + reportId, reportDto, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: reportDto
        })
    }
    catch (error) {
        console.log(error);
    }
}

export function createReport(reportDto){
    try {
        return axios.post(API_BASE_URL, reportDto, {
            headers: {
                'Content-Type': 'application/json'
            }}
        );
    } catch (error) {
        throw error;
    }
}


