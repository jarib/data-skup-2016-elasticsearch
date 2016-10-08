const es = require('elasticsearch');
const client = new es.Client();

client.search({
    index: 'data-skup-tweets',
    body: {
        query: {
            query_string: {
                query: "user.screen_name:erna_solberg"
            }
        },

        size: 10,

        sort: { created_at: 'desc' }
    }
})
.then(res => {
    const result = res.hits.hits.map(e => [
        e._source.created_at,
        e._source.text,
        e._source.user.name,
        e._source.representative.party
    ])
    console.log(JSON.stringify(result));
})
.catch(err => console.log(err));