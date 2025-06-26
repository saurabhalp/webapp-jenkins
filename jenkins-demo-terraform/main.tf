provider "aws" {
  region = "ap-south-1" # Mumbai region
}

resource "aws_key_pair" "deployer" {
  key_name   = "jenkins-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "jenkins_sg" {
  name        = "jenkins_sg"
  description = "Allow SSH, HTTP, and Jenkins"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "jenkins_instance" {
  ami           = "ami-0f58b397bc5c1f2e8" # Ubuntu 22.04 in ap-south-1
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.jenkins_sg.name]

  tags = {
    Name = "jenkins-demo"
  }
}
output "instance_public_ip" {
  value = aws_instance.jenkins_instance.public_ip
}


