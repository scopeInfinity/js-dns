# js-dns
Serve DNS over static page for HTTP webpages.

## Example

- http://scopeinfinity.github.io/dns/?letssync redirects to webpage served over a dynamic IPv6.
- http://scopeinfinity.github.io/dns/?goto_google/search?q=pokemon redirects to https://google.com/search?q=pokemon.
  - Commit: [339b2b5d](https://github.com/scopeInfinity/js-dns/commit/339b2b5d9de27715805221e2100280aaedd38a59)


## Usage

### Preparation
- Fork this repository to `https://github.com/<your_username>/js-dns`
- Create `<your_username>.github.io` repository (if not exists) OR any server serving static page.

### Setup the DNS
- Edit `dns_resolver.js`
  - Find `const DNS_MAPPING_URL = "...";` and replace it with
  - `const DNS_MAPPING_URL = "https://raw.githubusercontent.com/<your_username>/js-dns/main/mapping.json";`
- Add your `<yourdomainname>` and IP configuration in `mapping.json` as per the DNS Map configuration section.
- Create the serving page
  - [Option 1] Add a git submodule under `<your_username>.github.io` repository to `https://github.com/scopeInfinity/js-dns.git` with `dns` name.
    - The `js-dns/index.html` should accessible as `<your_username>.github.io/dns/index.html` 
  - [Option 2] Manually create `index.html` under `<your_username>.github.io`.
    - Paste contents from `https://raw.githubusercontent.com/scopeInfinity/js-dns/main/index.html` into the file.
    - Replace `dns_resolver.js` within the file to `https://raw.githubusercontent.com/<your_username>/js-dns/main/dns_resolver.js`
- Open your new URL
  - `https://<your_username>.github.io/dns/?<yourdomainname>` 
  - OR `https://<your_username>.github.io/dns/?<yourdomainname>/some/path`

## DNS Map Configuration

### Version 1

Sample configuration for `mapping.json`.
 - If multiple destination records are provided for a domainname then one of them is picked at random for balancing.

```json
{
    "version": 1,
    "map": {
        "sample_domain_a": {
            "REPLACE": [
                "http://[2a01:7200:abcd:1234:a1b2:12cd:12cb:111]:1234",
                "http://[2a01:7200:abcd:1234:a1b2:12cd:12cb:222]:1234",
                "http://[2a01:7200:abcd:1234:a1b2:1234:1234:111]"
            ]
        },
        "sample_domain_b": {
            "REPLACE": [
                "https://123.123.123.123"
            ]
        }
    }
}
```
