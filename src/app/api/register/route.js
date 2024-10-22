import prisma from "../../../../lib/prisma";
import {NextResponse} from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
    try {
        const { name, loginId, password } = await req.json();

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const user = await prisma.user.create({
            data: {
                name: name,
                login_id: loginId,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'User registration failed' }, { status: 500 });
    }
}