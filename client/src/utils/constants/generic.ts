export const shimmer_card_unit = 6
export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
export const CATEGORY_IMAGES_URL = `https://peermarket.s3.eu-west-2.amazonaws.com/Category`


export const getSearchUrl = (searchQuery: string) => {
  return `https://completion.amazon.co.uk/api/2017/suggestions?limit=11&prefix=${searchQuery}&suggestion-type=WIDGET&suggestion-type=KEYWORD&page-type=Gateway&alias=aps&site-variant=desktop&version=3&event=onkeypress&wc=&lop=en_GB&last-prefix=bottl&avg-ks-time=1934&fb=1&session-id=257-1546636-1205029&request-id=VHBKH39QHG13FJW7WT73&mid=A1F83G8C2ARO7P&plain-mid=3&client-info=amazon-search-ui`
}

export const bedEndPoint = "http://localhost:9000/api/"
export const socketEndPoint = "http://localhost:9000/";
