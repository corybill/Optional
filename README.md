# Optionals Library
##### Support for Guava like Optionals in Node.js
<p>Content in this document was copied from the Optionals documentation (https://code.google.com/p/guava-libraries/wiki/UsingAndAvoidingNullExplained).</p>
<p>FYI - I am in no way associated with Google.</p>

[![view on npm](http://img.shields.io/npm/v/guava-optional.svg)](https://www.npmjs.org/package/guava-optional)
[![npm module downloads](http://img.shields.io/npm/dt/guava-optional.svg)](https://www.npmjs.org/package/guava-optional)
[![Build Status](https://travis-ci.org/corybill/optional.svg?branch=master)](https://travis-ci.org/corybill/optional)
[![Gitter](https://badges.gitter.im/corybill/optional.svg)](https://gitter.im/corybill/optional?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Install
<pre><code>npm install guava-optional</code></pre>

<p>NOTE: In javascript we have the concept of undefined and null.  For the case of this library they are both treated as the same thing, some 'falsy' value.
    Therefore, wherever you see 'null' or 'undefined', you can read 'null or undefined'.</p>

## Description
<p>Careless use of null (and undefined in javascript) can cause a staggering variety of bugs. Studying the Google code base, (they) found that something like 95% of
  collections weren't supposed to have any null (or undefined) values in them, and having those fail fast rather than silently accept null (or undefined) would have been
  helpful to developers.  Additionally, null (or undefined) is unpleasantly ambiguous.  That said, there are times when null (or undefined) is the right and correct
  thing to use. null (or undefined) is cheap, in terms of memory and speed, and it's unavoidable in object arrays. But in application code, as opposed to libraries,
  it is a major source of confusion, difficult and weird bugs, and unpleasant ambiguities -- e.g. when Map.get returns null (or undefined), it can mean the value was absent,
  or the value was present and null (or undefined). Most critically, null (or undefined) gives no indication what a null (or undefined) value means.  For these reasons,
  many of Guava's utilities are designed to fail fast in the presence of null (or undefined) rather than allow nulls to be used, so long as there is a null-friendly
  (or undefined-friendly) workaround available.  Additionally, Guava provides a number of facilities both to make using null (or undefined) easier, when you must,
  and to help you avoid using null (and undefined).</p>

## Examples
There are plenty of examples using the Guava's Java API and it should be straight forward to follow these examples.  Also you can look at the tests found in the ./spec folder.
They include an example of every call possible in the library.  That being said I have included some basic use cases below.

#### Using Optional.of()
<pre>
    <code>
        var Optional = require("optional");
        var optional = Optional.of("SomeVal");
        optional.isPresent() //returns true
        optional.or("SomeValueThatIsDefined"); //returns "SomeVal" because the Optional instance contains an existing value.
        optional.or("SomeValueThatIsDefined"); //returns "SomeVal" because the Optional instance contains an existing value.
   </code>
</pre>

#### Using Optional.or()
<pre>
    <code>
        var Optional = require("optional");
        var optional = Optional.of("SomeVal");
        optional.isPresent() //returns true
        optional.or(); //throws error.  You should use orNull() instead of or(null)
        optional.orNull(); //returns "SomeVal" because the Optional instance contains an existing value.
   </code>
</pre>

#### Using Optional.absent()
<pre>
    <code>
        var Optional = require("optional");
        var absent1 = Optional.absent();
        var absent2 = Optional.absent();

        Optional.absent() === Optional.absent(); //returns true.  Absent is a singleton and will always equal itself.
        absent1 === Optional.absent(); //returns true.  Absent is a singleton and will always equal itself.
        absent2 === Optional.absent(); //returns true.  Absent is a singleton and will always equal itself.
        absent1 === absent2; //returns true.  Absent is a singleton and will always equal itself.

        absent1.isPresent(); //returns false because it is not present;
        absent2.isPresent(); //returns false because it is not present;
   </code>
</pre>

#### Using Optional.fromNullable()
<pre>
    <code>
        var Optional = require("optional");
        var absent = Optional.fromNullable();
        var present = Optional.fromNullable({ value: "SomeDefinedValue" });

        absent === Optional.absent(); //returns true.  Absent is a singleton and will always equal itself.
        absent.isPresent();  //returns false;
        present.isPresent(); //returns true;
   </code>
</pre>

## Missing API or Bugs
Please reach out to me (Cory Parrish) if you would like a new Optional type added or if you think you have found a bug.

## NPM Scripts
1. npm run test - Run linter and unit tests.
2. npm run ut - Use Maddox to Run Unit Tests.
3. npm run perf - Use Maddox to Performance metrics.
3. npm run uap - Use Maddox to Unit Tests and Performance metrics.
4. npm run lint - Run linter.
5. npm run docs - Rebuild public API Docs.

## Releases
  * 3.0.0
    * Now uses errr interface for preconditions. 
    * Redesign of code.
    * Now uses maddox for unit testing.
    * Moves to Node 5 paradigms.
    
## API

<dl>
<dt><a href="#Optional">Optional</a></dt>
<dd><p>Optional entry point interface.</p>
</dd>
<dt><a href="#Present">Present</a></dt>
<dd><p>Present Class represents an Optional that wraps a value that may or may not be defined.</p>
</dd>
<dt><a href="#Absent">Absent</a></dt>
<dd><p>Absent Class represents an Optional that wraps an undefined or null value.</p>
</dd>
</dl>

## Optional
Optional entry point interface.

**Kind**: global class  

* [Optional](#Optional)
    * [.of(item)](#Optional.of) ⇒ <code>[Present](#Present)</code>
    * [.absent()](#Optional.absent) ⇒ <code>[Absent](#Absent)</code>
    * [.fromUndefinedable(item)](#Optional.fromUndefinedable) ⇒ <code>[Absent](#Absent)</code> &#124; <code>[Present](#Present)</code>
    * [.fromNullable(item)](#Optional.fromNullable) ⇒ <code>[Absent](#Absent)</code> &#124; <code>[Present](#Present)</code>

<a name="Optional.of"></a>

### Optional.of(item) ⇒ <code>[Present](#Present)</code>
Get a Present instance with the given item that may or may not be defined.

**Kind**: static method of <code>[Optional](#Optional)</code>  
**Returns**: <code>[Present](#Present)</code> - - Instance of the Present class.  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | A value that may or may not be defined. |

<a name="Optional.absent"></a>

### Optional.absent() ⇒ <code>[Absent](#Absent)</code>
Get the Absent static instance.

**Kind**: static method of <code>[Optional](#Optional)</code>  
**Returns**: <code>[Absent](#Absent)</code> - - Absent static instance.  
<a name="Optional.fromUndefinedable"></a>

### Optional.fromUndefinedable(item) ⇒ <code>[Absent](#Absent)</code> &#124; <code>[Present](#Present)</code>
Synonym for fromNullable.

**Kind**: static method of <code>[Optional](#Optional)</code>  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | A value that may or may not be defined. |

<a name="Optional.fromNullable"></a>

### Optional.fromNullable(item) ⇒ <code>[Absent](#Absent)</code> &#124; <code>[Present](#Present)</code>
Returns the Absent static instance if the given value is not defined otherwise returns a Present instance.

**Kind**: static method of <code>[Optional](#Optional)</code>  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | A value that may or may not be defined. |

<a name="Present"></a>

## Present
Present Class represents an Optional that wraps a value that may or may not be defined.

**Kind**: global class  

* [Present](#Present)
    * [new Present(item)](#new_Present_new)
    * [.get()](#Present+get) ⇒ <code>Object</code>
    * [.or()](#Present+or) ⇒ <code>Object</code>
    * [.orUndefined()](#Present+orUndefined) ⇒ <code>Object</code> &#124; <code>undefined</code>
    * [.orNull()](#Present+orNull) ⇒ <code>Object</code> &#124; <code>undefined</code>
    * [.isPresent()](#Present+isPresent) ⇒ <code>Boolean</code>
    * [.transform(func)](#Present+transform) ⇒ <code>Object</code> &#124; <code>[Absent](#Absent)</code>

<a name="new_Present_new"></a>

### new Present(item)
Constructor for the Present class;


| Param | Type |
| --- | --- |
| item | <code>Object</code> | 

<a name="Present+get"></a>

### present.get() ⇒ <code>Object</code>
Get the wrapped item if it exists.

**Kind**: instance method of <code>[Present](#Present)</code>  
**Returns**: <code>Object</code> - - If the wrapped item is present, it will be returned.  
**Throws**:

- <code>Errr</code> - If the wrapped item is not present, the function will throw an Errr.

<a name="Present+or"></a>

### present.or() ⇒ <code>Object</code>
Get the wrapped item or the second choice.

**Kind**: instance method of <code>[Present](#Present)</code>  
**Returns**: <code>Object</code> - - If the wrapped item is present, it will be returned.  If the wrapped item is not present and the second choice is present, then the second choice will be returned.  
**Throws**:

- <code>Errr</code> - If the wrapped item and second choice is not present, the function will throw an Errr.

<a name="Present+orUndefined"></a>

### present.orUndefined() ⇒ <code>Object</code> &#124; <code>undefined</code>
Returns the wrapped item or undefined.

**Kind**: instance method of <code>[Present](#Present)</code>  
**Returns**: <code>Object</code> &#124; <code>undefined</code> - - If the wrapped item exists, it will be returned, else this function will return undefined.  
<a name="Present+orNull"></a>

### present.orNull() ⇒ <code>Object</code> &#124; <code>undefined</code>
Returns the wrapped item or null.

**Kind**: instance method of <code>[Present](#Present)</code>  
**Returns**: <code>Object</code> &#124; <code>undefined</code> - - If the wrapped item exists, it will be returned, else this function will return null.  
<a name="Present+isPresent"></a>

### present.isPresent() ⇒ <code>Boolean</code>
Describes if the wrapped item is present.

**Kind**: instance method of <code>[Present](#Present)</code>  
**Returns**: <code>Boolean</code> - - If the wrapped item exists, this function will return true, else false.  
<a name="Present+transform"></a>

### present.transform(func) ⇒ <code>Object</code> &#124; <code>[Absent](#Absent)</code>
Transform the wrapped item using the given function.

**Kind**: instance method of <code>[Present](#Present)</code>  
**Returns**: <code>Object</code> &#124; <code>[Absent](#Absent)</code> - - Returns transformed wrapped item it is present. Returns the Absent static instance if the wrapped item is not present.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function that will be used to transform the wrapped item. |

<a name="Absent"></a>

## Absent
Absent Class represents an Optional that wraps an undefined or null value.

**Kind**: global class  

* [Absent](#Absent)
    * [.get()](#Absent.get)
    * [.or(secondChoice)](#Absent.or) ⇒ <code>Object</code>
    * [.orUndefined()](#Absent.orUndefined) ⇒ <code>undefined</code>
    * [.orNull()](#Absent.orNull) ⇒ <code>null</code>
    * [.isPresent()](#Absent.isPresent) ⇒ <code>undefined</code>
    * [.transform()](#Absent.transform) ⇒ <code>undefined</code>

<a name="Absent.get"></a>

### Absent.get()
Always throws an Errr because the the value is Absent.

**Kind**: static method of <code>[Absent](#Absent)</code>  
**Throws**:

- <code>Errr</code> 

<a name="Absent.or"></a>

### Absent.or(secondChoice) ⇒ <code>Object</code>
If secondChoice is defined, then it will be returned.  If secondChoice is undefined or null, then the function will throw.

**Kind**: static method of <code>[Absent](#Absent)</code>  
**Returns**: <code>Object</code> - - The secondChoice passed into the 'or' function.  
**Throws**:

- <code>Errr</code> - Throw when secondChoice is undefined or null.


| Param |
| --- |
| secondChoice | 

<a name="Absent.orUndefined"></a>

### Absent.orUndefined() ⇒ <code>undefined</code>
Always returns undefined because the Absent object has no value.

**Kind**: static method of <code>[Absent](#Absent)</code>  
<a name="Absent.orNull"></a>

### Absent.orNull() ⇒ <code>null</code>
Always returns null because the Absent object has no value.

**Kind**: static method of <code>[Absent](#Absent)</code>  
<a name="Absent.isPresent"></a>

### Absent.isPresent() ⇒ <code>undefined</code>
Always returns false because the Absent object represents a non present Optional.

**Kind**: static method of <code>[Absent](#Absent)</code>  
<a name="Absent.transform"></a>

### Absent.transform() ⇒ <code>undefined</code>
Always returns the Absent static instance because the Absent object has no value to transform.

**Kind**: static method of <code>[Absent](#Absent)</code>  
<a name="Optional"></a>