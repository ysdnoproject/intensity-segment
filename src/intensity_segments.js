export class IntensitySegments {
  /**
   * This is the constructor for the IntensitySegments class
   * @constructor
   * @return {void}
   */
  constructor() {
    // first we initialize the map with -Infinity and Infinity set to 0
    this.map = new Map();
    this.map.set(-Infinity, 0);
    this.map.set(Infinity, 0);
    this.keys = [-Infinity, Infinity];
  }

  /**
   * This function adds the amount to the intensity of the range from `from` to `to`
   * @param {number} from - the start of the range
   * @param {number} to - the end of the range (not inclusive)
   * @param {number} amount - the amount to add to the intensity
   * @return {void}
   */
  add(from, to, amount) {
    this.set(from, to, amount);
    // merge same values
    this.mergeSameValues();
  }

  /**
   * This function sets the intensity of the range from `from` to `to` with the amount
   * @param {number} from
   * @param {number} to
   * @param {number} amount
   * @return {void}
   */
  set(from, to, amount) {
    // find lower bound of from and to that is the range that we need to update
    let keys = this.keys;
    let keys_start = this.lowerNumber(keys, keys.length, from);
    let keys_end = this.lowerNumber(keys, keys.length, to);

    // update the from
    let map_start_val = this.map.get(keys[keys_start]);
    this.map.set(from, map_start_val + amount);
    // update the to
    let map_end_val = this.map.get(keys[keys_end]);
    this.map.set(to, map_end_val);

    // update the range between from and to
    for (let i = keys_start + 1; i <= keys_end; i++) {
      if (keys[i] === from || keys[i] === to) {
        continue;
      }
      let map_val = this.map.get(keys[i]);
      this.map.set(keys[i], map_val + amount);
    }

    this.keys = Array.from(this.map.keys()).sort();
  }

  /**
   * This function merges the same values in the map
   * @return {void}
   */
  mergeSameValues() {
    let keys = this.keys;
    let new_keys = [];
    let prev = keys[0];
    new_keys.push(prev);
    let prev_value = this.map.get(prev);
    for (let i = 1; i < keys.length - 1; i++) {
      let key = keys[i];
      let value = this.map.get(key);
      if (value === prev_value) {
        this.map.delete(key);
      } else {
        new_keys.push(key);
      }
      prev = key;
      prev_value = value;
    }
    new_keys.push(keys[keys.length - 1]);
    this.keys = new_keys;
  }

  /**
   * This function returns the string representation of the segments
   * @return {string} - the string representation of the segments
   * @override
   */
  toString() {
    let keys = this.keys;
    let result = [];
    for (let key of keys) {
      if (key === -Infinity || key === Infinity) {
        continue;
      }
      result.push([key, this.map.get(key)]);
    }

    return JSON.stringify(result);
  }

  /**
   * This function finds the lower number of the value k in the array a with n elements
   * @param {Array<number>} a - the array of numbers
   * @param {number} n - the number of elements in the array
   * @param {number} k - the value to find the lower bound of
   * @returns {number} - the index of the lower bound of k in the array a
   */
  lowerNumber(a, n, k) {
    let l = 0;
    let r = n - 1;
    while (l + 1 < r) {
      let mid = l + r >> 1;

      if (a[mid] <= k) {
        l = mid;
      } else {
        r = mid;
      }
    }
    return l;
  }
}
