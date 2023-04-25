import { bedEndPoint } from "../utils/constants/generic"

export const fetchCategories = () => fetch(bedEndPoint)

export const fetchTopPools = () => fetch(`${bedEndPoint}pools/get-top-pools`)

export const fetchPoolById = (id: string) => fetch(`${bedEndPoint}pools/get-pool/${id}`)

