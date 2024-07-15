export const mongoConfig = (props: {
  username?: string;
  password?: string;
  dbName?: string;
  host?: string;
}) => {
  const username = encodeURIComponent(props.username || '');
  const password = encodeURIComponent(props.password || '');
  const DB_NAME = props.dbName || '';
  const DB_HOST = props.host || '';
  const AUTH = `${username}:${password}`;
  const DB = `${DB_HOST}/${DB_NAME}`;
  const MONGO_URI = `mongodb+srv://${AUTH}@${DB}?retryWrites=true&w=majority`;
  return MONGO_URI;
};
