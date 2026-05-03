const formatResponse = (req, res, next) => {
    const originalJson = res.json; // Store the original res.json method

    res.json = function(obj) { // Override res.json method
        const acceptHeader = req.headers.accept;

        // Check Accept header
        if (acceptHeader && acceptHeader.includes('application/xml')) {
            // Convert to XML (simplified example)
            const convertToXml = (obj) => {
                let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<response>\n';

                for (const key in obj) {
                    if (Array.isArray(obj[key])) {
                        xml += `<${key}>\n`;
                        obj[key].forEach(item => {
                            xml += '<item>\n';
                            for (const itemKey in item) {
                                xml += `<${itemKey}>${item[itemKey]}</${itemKey}>\n`;
                            }
                            xml += '</item>\n';
                        });
                        xml += `</${key}>\n`;
                    } else if (typeof obj[key] === 'object' && obj[key] != null) {
                        xml += `<${key}>\n`;
                        for (const nestedKey in obj[key]) {
                            xml += `<${nestedKey}>${obj[key][nestedKey]}</${nestedKey}>\n`;
                        }
                        xml += `</${key}>\n`;
                    } else {
                        xml += `<${key}>${obj[key]}</${key}>\n`;
                    }
                }

                xml += '</response>';
                return xml;
            };

            // Set content type to XML
            res.set('Content-Type', 'application/xml');
            // Call the original send method with XML
            return res.send(convertToXml(obj));
        } else {
            // Default to JSON
            res.set('Content-Type', 'application/json');
            return originalJson.call(this, obj); // Call the original json method
        }
    };

    next();
};

module.exports = formatResponse;