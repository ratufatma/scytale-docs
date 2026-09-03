# वैलिडेटर नोड त्वरित शुरुआत (v0.3.0-devnet)

Docker Compose के साथ **v0.3.0-devnet** पर वैलिडेटर नोड चलाने की संक्षिप्त मार्गदर्शिका।

---

## 1. एक कमांड में नोड चालू करें

```bash
git clone https://github.com/ratufatma/scytale-docs.git
cd scytale
docker compose up -d node-1
```

---

## 2. नोड स्थिति की जाँच

```bash
curl -s http://127.0.0.1:8332/api/v1/status | jq .
```
