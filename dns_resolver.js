// Retrieves the query from the current URL
function get_dns_query() {
    var url = new URL(document.URL);
    var query = url.search.substr(1);
    return query;
}

// Fetch and return DNS mapping for requested domainname.
async function fetch_dns_mapping(domainname) {
    return await fetch('mapping.json')
        .then(response => response.json())
        .then(mapping => {
            if(!mapping.hasOwnProperty(domainname)) {
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
        .then(dns_redirection => {
            if (dns_redirection == null) {
                return null;
            }
            // select random dns redirection.
            let dst_host = dns_redirection[Math.floor(Math.random() * dns_redirection.length)];
            return query.replace(domainname, dst_host);
        });
    return destination;
}
