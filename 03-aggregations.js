const es = require('elasticsearch');
const client = new es.Client();

client.search({
    index: 'data-skup-tweets',
    body: {
        query: {
            query_string: {
                query: "*"
            }
        },

        size: 0,

        aggregations: {
            parties: {
                terms: {
                    field: 'representative.party',
                    size: 10
                },

                aggregations: {
                    retweet_stats: {
                        stats: {
                            field: "retweet_count"
                        }
                    }
                }
            }
        }
    }
})
.then(res => {
    console.log(JSON.stringify(res.aggregations));
})
.catch(err => console.log(err));