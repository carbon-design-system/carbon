FROM gitpod/workspace-full

USER gitpod

RUN bash -cl ". .nvm/nvm.sh \
  && nvm install 12 \
  && nvm use 12 \
  && npm install -g prettier yarn cross-env jest \
  && echo -e \"\nnvm use 12\" >> ~/.bashrc"
