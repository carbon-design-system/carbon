workflow "Test workflow" {
  on = "push"
  resolves = ["Hello World"]
}

action "Hello World" {
  uses = "./action-a"
  env = {
    MY_NAME = "Carbon"
  }
  args = "\" Hello world, I'm $MY_NAME\""
}
