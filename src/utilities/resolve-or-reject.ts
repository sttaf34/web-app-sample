const resolveOrReject = (): Promise<number> => {
  return new Promise((resolve: (number) => void, reject: () => void): void => {
    const randomNumber = Math.random()
    return randomNumber >= 0.5 ? resolve(randomNumber) : reject()
  })
}

export default resolveOrReject
