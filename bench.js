// npm install blakejs
//
// simple comparison against blakejs, just to see the scale of difference
// against the pure JavaScript implementation

const { blake2b: blake2bc } = require('./')
const { blake2b: blake2bj } = require('blakejs')
const crypto = require('crypto')
const assert = require('assert')

const rounds = 100000

// sanity check
for (let i = 0; i < 10; i++) {
  const byts = crypto.randomBytes(Math.ceil(1024 * Math.random()))
  const c = blake2bc(byts, null, 32).toString('hex')
  const j = Buffer.from(blake2bj(byts, null, 32)).toString('hex')
  assert.strictEqual(c, j)
}

let start = Date.now()

// C++
for (let i = 0; i < rounds; i++) {
  const byts = crypto.randomBytes(Math.ceil(1024 * Math.random()))
  assert.strictEqual(blake2bc(byts, null, 32).length, 32)
}

console.log(`@rvagg/blake2 ${rounds} rounds in ${Date.now() - start} ms`)

start = Date.now()

// js
for (let i = 0; i < rounds; i++) {
  const byts = crypto.randomBytes(Math.ceil(1024 * Math.random()))
  assert.strictEqual(blake2bj(byts, null, 32).length, 32)
}

console.log(`      blakejs ${rounds} rounds in ${Date.now() - start} ms`)
