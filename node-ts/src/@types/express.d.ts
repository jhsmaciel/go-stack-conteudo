declare namespace Express {
    export interface Response {
        locals:{
            user: {
                id: string
            }
        }
    }
}
