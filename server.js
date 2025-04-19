const https = require('https');
const fs = require('fs');
const forge = require('node-forge');

const p12Buffer = fs.readFileSync('certs/server.p12');

const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString('binary'));
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'changeit');

let keyObj, certObj;

for (const safeContent of p12.safeContents) {
    for (const safeBag of safeContent.safeBags) {
        if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
            keyObj = forge.pki.privateKeyToPem(safeBag.key);
        } else if (safeBag.type === forge.pki.oids.certBag) {
            certObj = forge.pki.certificateToPem(safeBag.cert);
        }
    }
}

const options = {
    key: keyObj,
    cert: certObj,
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Lelikov Dmytro KP-22\n');
}).listen(8443, () => {
    console.log('HTTPS Server running on https://localhost:8443');
});
