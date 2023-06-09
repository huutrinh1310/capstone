#build this project
FROM maven:latest
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .
#RUN mvnw dependency:resolve
RUN mvn -f /home/app/pom.xml clean package
CMD ["./mvnw", "spring-boot:run"]
