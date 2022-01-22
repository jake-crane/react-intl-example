/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const supportedLanguages = ['fr-CA', 'es-MX'];
const langPath = 'lang';
const enJSONPath = `${langPath}/en.json`;

const enObj = JSON.parse(fs.readFileSync(enJSONPath, 'utf8'));
for (const currentLang of supportedLanguages) {
    const currentLangPath = `${langPath}/${currentLang}.json`;
    let newLaneObj = {};
    if (fs.existsSync(currentLangPath)) {
        const currentLangObj = JSON.parse(fs.readFileSync(currentLangPath, 'utf8'))
        for (const [enKey, enValue] of Object.entries(enObj)) {
            newLaneObj[enKey] = currentLangObj[enKey] ?? enValue;
        }
    } else {
        newLaneObj = enObj;
    }
    fs.writeFileSync(currentLangPath, JSON.stringify(newLaneObj, null, 2));
}
