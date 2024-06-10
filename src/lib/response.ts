export default interface Response<T> {
  last_updated: Date;
  data: T;
}
