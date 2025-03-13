#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
#cd "${BASEDIR}"/../


PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"
proto_ts="./generated_ts_proto"
swagger_doc="./swagger_doc"

# create directory if it does not exist
if [ ! -d proto_ts ]; then
    mkdir -p "${proto_ts}"
fi;

if [ ! -d swagger_doc ]; then
    mkdir -p "${swagger_doc}"
fi;

for f in ./node_modules/kenny-proto/proto/*; do

  # skip the non proto files
  if [ "$(basename "$f")" == "index.ts" ]; then
      continue
  fi

  # loop over all the available proto files and compile them into respective dir
  # JavaScript code generating
  ${GRPC_TOOLS_NODE_PROTOC} \
      --js_out=import_style=commonjs,binary:"${proto_ts}" \
      --grpc_out="${proto_ts}" \
      --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
      --proto_path="./node_modules/kenny-proto/proto/" \
      --proto_path="./node_modules/google-proto-files/" \
      -I "${f}" \
      "${f}"/*.proto

  ${GRPC_TOOLS_NODE_PROTOC} \
      --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
      --ts_out="${proto_ts}" \
      --proto_path="./node_modules/kenny-proto/proto/" \
      --proto_path="./node_modules/google-proto-files/" \
      -I "${f}" \
      "${f}"/*.proto

done