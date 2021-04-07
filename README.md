# js-dns
Serve DNS over static page for HTTP webpages.

## Usage

### Preparation
- Fork this repository to `https://github.com/<your_username>/js-dns`
- Prepare your `https://github.com/<your_username>/<your_username>.github.io` repository OR any server serving static page.

### Setup the DNS
- Edit `dns_resolver.js`
  - Find `const DNS_MAPPING_URL = "...";` and replace it with
  - `const DNS_MAPPING_URL = "https://raw.githubusercontent.com/<your_username>/js-dns/main/mapping.json";`
- Add your `domainname` and IP configuration in `mapping.json` as per the DNS Map configuration section.
- Add a git submodule under `<your_username>.github.io` repository to `https://github.com/scopeInfinity/js-dns.git`

## DNS Map Configuration

### Version 1

Sample configuration for `mapping.json`.
 - If multiple destination records are provided for a domainname then one of them is picked at random for balancing.

```json
{
    "version": 1,
    "map": {
        "sample_domain_a": {
            "AAAA": [
                "http://[2a01:7200:abcd:1234:a1b2:12cd:12cb:111]:1234",
                "http://[2a01:7200:abcd:1234:a1b2:12cd:12cb:222]:1234",
                "http://[2a01:7200:abcd:1234:a1b2:1234:1234:111]"
            ]
        },
        "sample_domain_b": {
            "AAAA": [
                "https://123.123.123.123"
            ]
        }
    }
}
```
