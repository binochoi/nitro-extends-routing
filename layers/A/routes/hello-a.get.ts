export default defineEventHandler({
    onRequest: [
        defineEventHandler(() => {
        })
    ],
    handler: (e) => {
        console.log('hello A !!')
        return 'Hello A !'
    }
})