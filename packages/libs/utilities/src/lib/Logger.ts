export function Log(content: any) {
  if (typeof content === 'string')
    LogString(content);
  else {
    if (content.name && content.message)
      LogError(content);
    else
      LogObject(content);
  }
}

const LogObject = (obj: any) => {
  let str = JSON.stringify(obj);
  WriteToConsole(str);
};

const LogError = (error: Error) => {
  WriteToConsole(error.name);
  WriteToConsole(error.message);

  if (error.stack) WriteToConsole(error.stack);
};

const LogString = (str: string) => {
  WriteToConsole(str);
};

const WriteToConsole = (content: string) => {
  let now = new Date();

  console.log(`${now.toISOString()} ${content}`);
};
