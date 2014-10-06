#Optionals Library
####Support for Guava like Optionals in Node.js
####Content in this document was copied from the Optionals documentation (https://code.google.com/p/guava-libraries/wiki/UsingAndAvoidingNullExplained).
<p>FYI - I am in no way associated with Google.</p>

###Install
<pre>
    <code>
        npm install guava-optional
   </code>
</pre>

###Source Code
<pre>
    <code>
        https://github.com/corybill/Optional
   </code>
</pre>

<p>NOTE: In javascript we have the concept of undefined and null.  For the case of this library they are both treated as the same thing, some 'falsy' value.
    Therefore, wherever you see 'null' or 'undefined', you can read 'null or undefined'.</p>

###Description
<p>Careless use of null (and undefined in javascript) can cause a staggering variety of bugs. Studying the Google code base, (they) found that something like 95% of
  collections weren't supposed to have any null (or undefined) values in them, and having those fail fast rather than silently accept null (or undefined) would have been
  helpful to developers.  Additionally, null (or undefined) is unpleasantly ambiguous.  That said, there are times when null (or undefined) is the right and correct
  thing to use. null (or undefined) is cheap, in terms of memory and speed, and it's unavoidable in object arrays. But in application code, as opposed to libraries,
  it is a major source of confusion, difficult and weird bugs, and unpleasant ambiguities -- e.g. when Map.get returns null (or undefined), it can mean the value was absent,
  or the value was present and null (or undefined). Most critically, null (or undefined) gives no indication what a null (or undefined) value means.  For these reasons,
  many of Guava's utilities are designed to fail fast in the presence of null (or undefined) rather than allow nulls to be used, so long as there is a null-friendly
  (or undefined-friendly) workaround available.  Additionally, Guava provides a number of facilities both to make using null (or undefined) easier, when you must,
  and to help you avoid using null (and undefined).</p>

###High Level Info
####Optional Static
The library gives you "static" functions that allow you to access the framework.
1. of - Make an Optional containing the given non-null value, or fail fast on null or undefined.
2. absent - Return an absent Optional.
3. fromUndefinedable - Turn the given possibly-null reference into an Optional, treating non-null as present and null as absent.
4. fromNullable - Turn the given possibly-null reference into an Optional, treating non-null as present and null as absent.

####Optional - An immutable object that may contain a non-null reference to another object. Each instance of this type either contains a non-null reference, or contains nothing
                   (in which case we say that the reference is "absent"); it is never said to "contain null".
The Optional instance has 6 prototype methods.
1. get - returns the item or throws an error if it is 'falsy'.
2. or - Returns the present value in this Optional, or if there is none, returns the specified default.
3. orUndefined - Just a passthrough as it directly call 'orNull'.
4. orNull - Returns the present value in this Optional, or if there is none, returns null. The inverse operation of fromNullable.
5. isPresent - Returns true if this Optional contains a non-null instance (i.e. if it is 'truth').
6. transform - transform an item by passing in a function transformer.  If item is 'falsy' then it will always return the Absent instance.

####Absent - Implementation of an Optional not containing a reference.
The Absent instance has 6 prototype methods.
1. get - Always returns an error as it is always 'falsy'.
2. or - Always returns the parameter as the value.
3. orUndefined - Just a passthrough as it directly call 'orNull'.
4. orNull - Always returns undefined.
5. isPresent - Always returns false as the item is always 'falsy'.
6. transform -  It will always return the Absent instance because the item is always 'falsy'.

###Examples
There are plenty of examples using the Guava's Java API and it should be straight forward to follow these examples.  Also you can look at the tests found in the ./spec folder.
They include an example of every call possible in the library.  That being said I have included some basic use cases below.

####Using Optional.of()
<pre>
    <code>
        var Optional = require("optional");
        var optional = Optional.of("SomeVal");
        optional.isPresent() //returns true
        optional.or("SomeValueThatIsDefined"); //returns "SomeVal" because the Optional instance contains an existing value.
        optional.or("SomeValueThatIsDefined"); //returns "SomeVal" because the Optional instance contains an existing value.
   </code>
</pre>

####Using Optional.or()
<pre>
    <code>
        var Optional = require("optional");
        var optional = Optional.of("SomeVal");
        optional.isPresent() //returns true
        optional.or(); //throws error.  You should use orNull() instead of or(null)
        optional.orNull(); //returns "SomeVal" because the Optional instance contains an existing value.
   </code>
</pre>

####Using Optional.absent()
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

####Using Optional.fromNullable()
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

###Missing API or Bugs
Please reach out to me (Cory Parrish) if you would like a new Optional type added or if you think you have found a bug.
