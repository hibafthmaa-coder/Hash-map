
class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = Array.from(
      { length: this.capacity },
      () => []
    );
    this.count = 0;
  }

  // 1. Hash function
  hash(key) {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) %
        this.capacity;
    }

    return hashCode;
  }

  // Check whether an index is valid
  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  // 2. Set key-value pair
  set(key, value) {
    let index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    // Check whether the key already exists
    for (const entry of bucket) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }

    // Add new key-value pair
    bucket.push([key, value]);
    this.count++;

    // Check load factor
    if (this.count / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  // Grow capacity and rehash existing entries
  grow() {
    const oldEntries = this.entries();

    this.capacity *= 2;

    this.buckets = Array.from(
      { length: this.capacity },
      () => []
    );

    this.count = 0;

    // Insert old entries into new buckets
    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }

  // 3. Get value using key
  get(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry[0] === key) {
        return entry[1];
      }
    }

    return undefined;
  }

  // 4. Check if key exists
  has(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    return bucket.some(entry => entry[0] === key);
  }

  // 5. Remove key-value pair
  remove(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    const entryIndex = bucket.findIndex(
      entry => entry[0] === key
    );

    if (entryIndex === -1) {
      return false;
    }

    bucket.splice(entryIndex, 1);
    this.count--;

    return true;
  }

  // 6. Return number of entries
  length() {
    return this.count;
  }

  // 7. Remove all entries
  clear() {
    this.buckets = Array.from(
      { length: this.capacity },
      () => []
    );

    this.count = 0;
  }

  // 8. Return all keys
  keys() {
    const allKeys = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        allKeys.push(entry[0]);
      }
    }

    return allKeys;
  }

  // 9. Return all values
  values() {
    const allValues = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        allValues.push(entry[1]);
      }
    }

    return allValues;
  }

  // 10. Return all key-value pairs
  entries() {
    const allEntries = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        allEntries.push(entry);
      }
    }

    return allEntries;
  }
}


// TESTING THE HASHMAP

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Initial entries:", test.length());
console.log("Capacity:", test.capacity);
console.log("Load factor:", test.count / test.capacity);

// Overwrite existing value
test.set("apple", "green");

console.log("Updated apple:", test.get("apple"));
console.log("Length after update:", test.length());

// Add 13th entry to trigger growth
test.set("moon", "silver");

console.log("After growing:");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);
console.log("Load factor:", test.count / test.capacity);

// Test other methods
console.log("Get banana:", test.get("banana"));
console.log("Has apple:", test.has("apple"));
console.log("Has mango:", test.has("mango"));

console.log("Remove dog:", test.remove("dog"));
console.log("Length after removal:", test.length());

console.log("All keys:", test.keys());
console.log("All values:", test.values());
console.log("All entries:", test.entries());

// Clear everything
test.clear();

console.log("After clear:", test.length());
console.log("All entries:", test.entries());
