#include <napi.h>
#include "blake2.h"

Napi::Value Blake2(const Napi::CallbackInfo& info, bool b) {
  Napi::Env env = info.Env();

  if (info.Length() != 3) {
    Napi::Error::New(env, "Expected 3 arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsBuffer()) {
    Napi::Error::New(env, "Expected first argument (input) to be a Buffer").ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!(info[1].IsBuffer() || info[1].IsNull())) {
    Napi::Error::New(env, "Expected second argument (key) to be a Buffer or null").ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[2].IsNumber()) {
    Napi::Error::New(env, "Expected third argument (outlen) to be a number").ThrowAsJavaScriptException();
    return env.Null();
  }

  Napi::Buffer<uint8_t> input = info[0].As<Napi::Buffer<uint8_t>>();
  uint8_t* inputData = input.Data();

  uint8_t* keyData = NULL;
  size_t keyLength = 0;
  if (!info[1].IsNull()) {
    Napi::Buffer<uint8_t> key = info[1].As<Napi::Buffer<uint8_t>>();
    keyData = key.Data();
    keyLength = key.Length();
  }

  Napi::Number outlen = info[2].As<Napi::Number>();
  size_t outlenValue = outlen.Uint32Value();

  uint8_t* outData = new uint8_t[outlenValue];
  if (b) {
    blake2b(outData, outlenValue, inputData, input.Length(), keyData, keyLength);
  } else {
    blake2s(outData, outlenValue, inputData, input.Length(), keyData, keyLength);
  }
  Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outData, outlenValue);
  delete outData;

  return buffer;
}

Napi::Value Blake2b(const Napi::CallbackInfo& info) {
  return Blake2(info, true);
}

Napi::Value Blake2s(const Napi::CallbackInfo& info) {
  return Blake2(info, false);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "blake2b"), Napi::Function::New(env, Blake2b));
  exports.Set(Napi::String::New(env, "blake2s"), Napi::Function::New(env, Blake2s));
  return exports;
}

NODE_API_MODULE(addon, Init)
