# React + TypeScript + Vite
## สร้าง web app ด้วย Docker แล้ว deploy ขึ้น AWS
### IP เครื่อง  18.139.111.82:8119 (http://47.129.222.204:8119/)
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
   ```bash
   docker build -t jirapornsor/ct648_bun_react_docker:0.2 . --push 
   ```
4. ทดสอบ run ด้วยคำสั่ง
   ```bash
   docker run -d -p 8119:80 jirapornsor/ct648_bun_react_docker:0.2
   ```
#### ขั้นตอนการดำเนิน Deploy
1. SSH เข้าไปที่ instance EC2 ที่สร้างไว้ใน aws ในที่นี้ใช้ Ubuntu 
2. install docker โดยคำสั่ง
   - Update 
     ```bash
     sudo apt update
     ```
   - install docker
     ```bash
     sudo apt install docker.io
     ```
3. ดึง Docker image ที่ชื่อ jirapornsor/ct648_bun_react_docker และมีแท็กเป็น 0.2 จาก Docker Hub ที่สร้างและ push ขึ้นไปไว้ก่อนห้านี้มายังเครื่อง instance EC2 ของเรา ด้วยคำสั่งนี้
   ```bash
   sudo docker pull jirapornsor/ct648_bun_react_docker:0.2
   ```
4. ทดสอบ run ด้วยคำสั่ง
   ```bash
   docker run -d -p 8119:80 jirapornsor/ct648_bun_react_docker:0.2
   ```
5. เมื่อ run ผ่านและไม่มี error ก็เข้าไปดูหน้า web ด้วย Public IP ของเครื่อง instance EC2
