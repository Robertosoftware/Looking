const url ="https://newsapi.org/v2/top-headlines?country=mx&category=health&apiKey=be469de067c14a2d9408d154d7bcf539";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}