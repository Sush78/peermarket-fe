import { hosturl } from "../utils/constants/generic"
//http://ec2-13-42-40-31.eu-west-2.compute.amazonaws.com/pools/get-top-pools

export const fetchCategories = () => fetch(hosturl)

export const fetchTopPools = () => fetch(`${hosturl}pools/get-top-pools`)

export const fetchPoolById = (id: string) => fetch(`${hosturl}pools/get-pool/${id}`)

