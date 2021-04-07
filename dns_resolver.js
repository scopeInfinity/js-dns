"use strict";

// URL pointing to DNS Mapping in version 1.
const DNS_MAPPING_URL = "mapping.json";
const SUPPORTED_VERSION = 1;

// Retrieves the query from the current URL
function get_dns_query() {
    var url = new URL(document.URL);
    var query = url.search.substr(1);
    return query;
}

// Fetch and return DNS record for the requested domainname.
async function fetch_dns_mapping(domainname, version) {
    return await fetch(DNS_MAPPING_URL)
        .then(response => response.json())
        .then(dns_response => {
            let got_version = dns_response["version"];
            if(got_version != SUPPORTED_VERSION) {
                console.log("fetch_dns_mapping supports v" + SUPPORTED_VERSION +
                    " got v" + got_version);
                return null;
            }
            let mapping = dns_response["map"];
            if (mapping == null) {
                console.log("fetch_dns_mapping got null mapping in response.");
                return null;
            }
            return mapping;
        })
        .then(mapping => {
            if(mapping[domainname] == undefined) {
                return null;
            }
            return mapping[domainname];
        });
}

// Returns full destination path for the given query string.
async function get_destination(query) {
    var parts = query.split("/");
    var domainname = parts[0];

    var destination = await fetch_dns_mapping(domainname)
        .then(dns_record => {
            if (dns_record == null) {
                return null;
            }
            // select random dns redirection.
            // supports IPv6 only.
            let ip_v6_records = dns_record["AAAA"];
            if (ip_v6_records == undefined) {
                return null;
            }
            let dst_host = ip_v6_records[Math.floor(Math.random() * ip_v6_records.length)];
            return query.replace(domainname, dst_host);
        });
    return destination;
}
