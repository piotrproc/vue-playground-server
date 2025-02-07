export default defineEventHandler((event:any) => {
    // console.log(event)
    const query = getQuery(event)

    return {
        hello: query["people"]  //event.body.toString();
    }
})