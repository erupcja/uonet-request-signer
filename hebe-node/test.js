const assert = require('assert');
const {expect} = require("chai");
const {getSignatureValues} = require("./signer");

const fullUrl = "/powiatwulkanowy/123456/api/mobile/register/hebe";
const fingerprint = "7EBA57E1DDBA1C249D097A9FF1C9CCDD45351A6A";
const privateKey = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCbF5Tt176EpB4cX5U+PZE0XytjJ9ABDZFaBFDkaexbkuNeuLOaARjQEOlUoBmpZQXxAF8HlYqeTvPiTcnSfQIS6EdqpICuQNdwvy6CHFAe2imkbbB0aHPsGep6zH8ZxHbssazkTCnGy0j2ZtGT2/iy1GEvc/p2bOkCVcR1H1GqFp+/XpfaMwi2SRCwc67K8Fu8TjSDKNvcRT9nuenGoPA1CWoOiOCxhQA6gnB8LULPel6TVDxeBVdYor/z2GxFe/m0pa7XAKzveuUDhH8k8NlNG65MjvZhgy9iFs+eBUq7lCZ0nuIsDzjnUrLSl4ciYKj9d94qrUyF8L8D9Rl+0WlAgMBAAECggEAQ6jg3rNmyxIg0rl0ZG/LjEF26RKR7P5KQLcpouESga3HfzHvsjMCq+OWZvciFhazRd4BQkdwZxGPnfa7ieGzmhtvs1pDu8zU/hE4UClV+EG6NpVpC2Q/sn5KZRijaZoY3eMGQUFatBzCBcLZxYspfbyR3ucLbu9DE+foNB1Fh4u9RCDj3bClTsqPcNBIaLMpYr3f/bM1fFbS9LrJ7AXZQtGg/2MH58WsvV67SiYAQqGCzld/Jp74gmod4Ii0w2XWZ7OeixdF2xr1j7TK0dUUlrrOrb1cgOWSOEXyy3RX/iF7R8uuLXiRfo1URh6VNPoOtrC6fHCrCp1iRBo08qOk4QKBgQDxqLrWA7gKcTr2yQeGfETXOAYi0xqbNj5A9eVC0XngxnFuwWc5zyg3Ps3c0UK2qTSSFv4SoeEHQM+U0+9LjYzIRSUH7zy4zBrBlLtTQCysSuuZ9QfgO55b3/QEYkyx6Hz/z/gg53jKHjsUKIftGMwJ6C1M2svbBNYCsWrUuYcsbQKBgQDN9gkVDABIeWUtKDHyB5HGcVbsg7Ji7GhMjdFA0GB+9kR0doKNctrzxKn65BI2uTWg+mxaw5V+UeJOIaeFsv2uClYJYn1F55VT7NIx3CLFv6zFRSiMSKz2W+NkwGjQqR7D3DeEyalpjeQeMdpHZg27LMbdVkzy/cK8EM9ZQlRLGQKBgQCpB2wn5dIE+85Sb6pj1ugP4Y/pK9+gUQCaT2RcqEingCY3Ye/h75QhkDxOB9CyEwhCZvKv9aqAeES5xMPMBOZD7plIQ34lhB3y6SVdxbV5ja3dshYgMZNCkBMOPfOHPSaxh7X2zfEe7qZEI1Vv8bhF9bA54ZBVUbyfhZlD0cFKwQKBgQC9BnXHb0BDQ8br7twH+ZJ8wkC4yRXLXJVMzUujZJtrarHhAXNIRoVU/MXUkcV1m/3wRGV119M4IAbHFnQdbO0N8kaMTmwS4DxYzh0LzbHMM+JpGtPgDENRx3unWD/aYZzuvQnnQP3O9n7Kh46BwNQRWUMamL3+tY8n83WZwhqC4QKBgBTUzHy0sEEZ3hYgwU2ygbzC0vPladw2KqtKy+0LdHtx5pqE4/pvhVMpRRTNBDiAvb5lZmMB/B3CzoiMQOwczuus8Xsx7bEci28DzQ+g2zt0/bC2Xl+992Ass5PP5NtOrP/9QiTNgoFSCrVnZnNzQqpjCrFsjfOD2fiuFLCD6zi6";
const body = "{}";

describe("Invalid inputs", () => {
    it("invalid url", () => {
        expect(() => {
            getSignatureValues(fingerprint, privateKey, body, "", +new Date())
        }).to.throw("The URL does not seem correct (does not match `(api/mobile/.+)` regex)");
    });
});

describe("Check result", () => {
    it("values should match", () => {
        const {digest, canonicalUrl, signature} = getSignatureValues(fingerprint, privateKey, body, fullUrl, +new Date(Date.UTC(2020, 3, 14, 4, 14, 15)));

        assert.equal(digest, "SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=");
        assert.equal(canonicalUrl, "api%2fmobile%2fregister%2fhebe");
        assert.equal(signature, "keyId=\"7EBA57E1DDBA1C249D097A9FF1C9CCDD45351A6A\"," +
            "headers=\"vCanonicalUrl Digest vDate\"," +
            "algorithm=\"sha256withrsa\"," +
            "signature=Base64(SHA256withRSA(mIVNkthTzTHmmXG1qxv1Jpt3uRlyhbj7VHysbCNpl0zXCCzuwTXsuCrfjexDDXsyJVo/LznQKOyvOaW4tEfrBobxtbtTnp7zYi54bdvAZa3pvM02yvkH4i/DvTLDKRO0R9UDZ1LraGrOTsIe3m3mQ21NOynVqCKadeqod8Y7l4YUlVYEmrtq/7xbCwr0qdne6G67eY4Amj6ffbG3TkVLpUrEETBnAC7oFjGYKhcRyvltAi+lcv6omANz1gwELf+Vmsa8NwFo/YGwY3R23z15athU/1iC1JcrECBLC8nRM1+KlvyIqx2HX6RG5R1cMOwBWVg6pRKUdrhxYbQ+VQ8Cag==))");
    });
});
