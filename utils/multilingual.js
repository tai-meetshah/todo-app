module.exports = (doc, req) => {
    const accepted = ['en', 'es'];
    let language = accepted.includes(req.headers['accept-language'])
        ? req.headers['accept-language']
        : 'en';
    const lang = doc[language];
    let spread = doc.toObject ? doc.toObject() : doc;
    const newDoc = { ...lang, ...spread };
    delete newDoc.en;
    delete newDoc.es;
    return newDoc;
};
