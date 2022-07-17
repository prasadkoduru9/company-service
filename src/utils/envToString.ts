class EnvToString {
  /**
   * Convert environment variable to string
   * @param  {} values
   */
  convert(value) {
    return value === undefined ? '' : value;
  }
}

export const env = new EnvToString();
