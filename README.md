# React + TypeScript + Vite
### สร้าง web app ด้วย Docker แล้ว deploy ขึ้น AWS
#### ขั้นตอนการดำเนินการ
1. สร้าง Dockerfile ไว้ในโปรเจกต์ เพื่อตั้งค่าโปรเจกต์ Bun ที่ทำงานร่วมกับ Nginx โดยมีการทำงานแบบสองขั้นตอน (multi-stage build) ซึ่งช่วยให้ขนาดของ image ที่ได้มีขนาดเล็กลง และทำงานได้อย่างมีประสิทธิภาพมากขึ้น
   - การสร้างแอปด้วย Bun เป็นการเตรียมและสร้างแอปพลิเคชัน Bun ก่อนนำไปใช้งานกับ Nginx ในขั้นต่อไป
     ```dockerfile
      FROM oven/bun:latest AS bun-builder
      WORKDIR /app
      COPY . .
      RUN bun install
      RUN bun run build
     ```
   - การใช้ Nginx เพื่อให้บริการแอป ขั้นตอนนี้ใช้ Nginx ในการทำให้แอปพลิเคชันที่ถูกสร้างพร้อมให้เข้าถึงผ่านเว็บ
     ```dockerfile
      FROM nginx:alpine-slim
      COPY --from=bun-builder /app/dist /usr/share/nginx/html
      EXPOSE 80
      CMD ["nginx", "-g", "daemon off;"]
     ```
2. ไปสร้าง repository ชื่อ jirapornsor/ct648_bun_react_docker ไว้ที่ Docker Hub https://hub.docker.com/ 
3. กลับมาที่โปรแกรม VSCODE สร้าง Docker image ชื่อ jirapornsor/ct648_bun_react_docker:0.2 จาก Dockerfile ในไดเรกทอรีปัจจุบัน และ push image ขึ้นไปยัง Docker Hub ด้วยคำสั่ง
   - login Docker hub
     ```bash
     docker build -t jirapornsor/ct648_bun_react_docker:tagname .
     ``` 
