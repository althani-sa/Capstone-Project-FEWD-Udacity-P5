import { handleSubmit } from "../src/client/js/app"

describe("async formHandler callback function that retrieves data from 3 apis and updates the UI based on user data ", () => {
    test("Function is defined", () => {
        expect(handleSubmit).toBeDefined()
    })
})