const url = "http://localhost:9000/"
//http://ec2-13-42-40-31.eu-west-2.compute.amazonaws.com/pools/get-top-pools
//http://localhost:9000/

export const fetchCategories = () => fetch(url)

export const fetchTopPools = () => fetch(`${url}pools/get-top-pools`)

export const fetchPoolById = (id: string) => fetch(`${url}pools/get-pool/${id}`)

